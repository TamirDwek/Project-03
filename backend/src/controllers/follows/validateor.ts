import Joi from "joi";

export const FollowValidator = Joi.object({
    vacationId: Joi.string().uuid().required()
    
})

export const unfollowValidator = FollowValidator