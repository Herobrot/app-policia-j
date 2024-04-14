export function saveAuthData(token, _idUser) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('_idUser', _idUser);
  }
  

  export function getAuthData() {
    try {
      const token = sessionStorage.getItem('token');
      const _idUser = sessionStorage.getItem('_idUser');
      return { token, _idUser }
    }  catch (error) {
      const token = "";
      const _idUser = "";
      return {token, _idUser};
    };
  }
 
  export function clearAuthData() {
    try {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('_idUser');
    } catch (error) {
      throw new Error("Objetos no encontrados para remover");
    }
  }
  