import * as api from './api.js';

export async function getAll(){
    return await api.get('data/games?sortBy=_createdOn%20desc');
}

export async function getById(id){
    return await api.get('data/games/'+id);
}

export async function getAllComments(gameId){
    return await api.get(`data/comments?where=gameId%3D%22${gameId}%22`)
}

export async function deleteById(id){
    return await api.del('data/games/'+id);
}

export async function createGame(data){
    return await api.post('data/games', data)
}

export async function createComment(data){
    return await api.post('data/comments', data)
}

export async function updateGame(id,data){
    return await api.put('data/games/'+id, data)
}

export async function sendLike(data){
    return await api.post('data/likes', data)
}

export async function getLikeCount(gameId){
    return await api.get(`data/likes?where=gameId%3D%22${gameId}%22&distinct=_ownerId&count`);
}

export async function checkLike(gameId, userId){
    return await api.get(`data/likes?where=gameId%3D%22${gameId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function deleteLikeById(id){
    return await api.del('data/likes/'+id);
}

export async function getLikeId(gameId,userId){
    return await api.get(`data/likes?where=gameId%3D%22${gameId}%22%20and%20_ownerId%3D%22${userId}%22`);
}