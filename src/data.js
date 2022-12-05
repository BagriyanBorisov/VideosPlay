import * as api from './api.js';

export async function getAll(){
    return await api.get('data/games?sortBy=_createdOn%20desc');
}

export async function getLatest(){
    return await api.get('data/games?sortBy=_createdOn%20desc&distinct=category')
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