import { useEffect, useState } from "react";
import useService from "../../../hooks/useService";
import useTitle from "../../../hooks/useTitle";
import "./Vacations.css";
import Loading from "../../common/loading/Loading";
import VacationCard from "../vacationCard/VacationCard";
import VacationsService from "../../../services/auth-aware/Vacation";
import { useAppDispatch, useAppSelectors } from "../../../redux/hooks";
import { setVacations } from "../../../redux/vacationsSlice";
import { setLikedVacations, toggleLike } from "../../../redux/likeSlice";
import { useAuth } from "../../../hooks/useAuth";
import VacationModel from "../../models/vacations/VacationModel";
import socket from "../../../services/socket";

export default function Vacations(): JSX.Element | null {
  useTitle("Vacations");

  const dispatch = useAppDispatch();
  const vacations = useAppSelectors((state) => state.vacations.vacations);
  const likedVacations = useAppSelectors((state) => state.likes.likedVacations);
  const { jwt, role } = useAuth(); // ✅ הוספנו role מה־context
  const loading = vacations.length === 0;
  const vacationService = useService(VacationsService);

  const [currentPage, setCurrentPage] = useState(1);
  const vacationsPerPage = 10;

  const [onlyLiked, setOnlyLiked] = useState(false);
  const [onlyFuture, setOnlyFuture] = useState(false);
  const [onlyActive, setOnlyActive] = useState(false);

  const filteredVacations = vacations.filter((v) => {
    const now = new Date();
    const start = new Date(v.startDate);
    const end = new Date(v.endDate);

    if (onlyLiked && !likedVacations[v.id]) return false;
    if (onlyFuture && start <= now) return false;
    if (onlyActive && !(start <= now && end >= now)) return false;
    return true;
  });

  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = filteredVacations.slice(indexOfFirstVacation, indexOfLastVacation);
  const totalPages = Math.ceil(filteredVacations.length / vacationsPerPage);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Socket connected!", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected.");
    });

    socket.on("vacation-added", (newVacation: VacationModel) => {
      dispatch(setVacations([...vacations, newVacation]));
    });

    socket.on("vacation-deleted", ({ id }: { id: string }) => {
      dispatch(setVacations(vacations.filter((v) => v.id !== id)));
    });

    socket.on("like-updated", ({ vacationId, likesCount }: { vacationId: string; likesCount: number }) => {
      dispatch(
        setVacations(
          vacations.map((v) =>
            v.id === vacationId ? { ...v, likesCount } : v
          )
        )
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("vacation-added");
      socket.off("vacation-deleted");
      socket.off("like-updated");
    };
  }, [vacations, dispatch]);

  useEffect(() => {
    if (!jwt) return;

    (async () => {
      try {
        const allVacations = await vacationService.getAll();
        dispatch(setVacations(allVacations));

        const likedIds = await vacationService.getFollowed();
        const likedMap = likedIds.reduce((map, id) => {
          map[id] = true;
          return map;
        }, {} as Record<string, boolean>);
        dispatch(setLikedVacations(likedMap));
      } catch (e) {
        console.error("שגיאה בטעינת חופשות:", e);
        alert(JSON.stringify(e));
      }
    })();
  }, [jwt]);

  const handleRemoveLike = async (vacationId: string) => {
    try {
      await vacationService.removeLike(vacationId);
      dispatch(toggleLike(vacationId));
    } catch (e) {
      alert(e);
    }
  };

  const handleDelete = async (vacationId: string) => {
    try {
      await vacationService.remove(vacationId);
    } catch (e) {
      alert(e);
    }
  };

  const handleLikeToggle = async (vacationId: string) => {
    try {
      dispatch(toggleLike(vacationId));
      await vacationService.addLike(vacationId);
    } catch (e) {
      alert(e);
    }
  };

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  if (!jwt) return null;

  return (
    <div className="VacationsPage">
      {loading && <Loading />}

      {role === "user" && (
        <div className="filters">
          <label>
            <input
              type="checkbox"
              checked={onlyLiked}
              onChange={() => setOnlyLiked((prev) => !prev)}
            />
            Favourites
          </label>
          <label>
            <input
              type="checkbox"
              checked={onlyFuture}
              onChange={() => setOnlyFuture((prev) => !prev)}
            />
            Future
          </label>
          <label>
            <input
              type="checkbox"
              checked={onlyActive}
              onChange={() => setOnlyActive((prev) => !prev)}
            />
            Active
          </label>
        </div>
      )}

      {!loading && filteredVacations.length === 0 && <p>No vacations found.</p>}

      {!loading && filteredVacations.length > 0 && (
        <>
          <div className="vacation-list">
            {currentVacations.map((vacation) => (
              <VacationCard
                key={vacation.id}
                vacation={vacation}
                onDelete={handleDelete}
                onLikeToggle={handleLikeToggle}
                isLiked={likedVacations[vacation.id]}
                removeLike={handleRemoveLike}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="Pagination">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
