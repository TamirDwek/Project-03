export default interface VacationModel {
    id: string;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    imageFile: string;
    likesCount: number; 
    isFollowing?: boolean;
  }
 