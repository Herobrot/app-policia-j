export function saveAuthData(token, _idUser) {
    localStorage.setItem('token', token);
    localStorage.setItem('_idUser', _idUser);
  }
  

  export function getAuthData() {
    try {
      const token = localStorage.getItem('token');
      const _idUser = localStorage.getItem('_idUser');
      return { token, _idUser }
    }  catch (error) {
      const token = "";
      const _idUser = "";
      return {token, _idUser};
    };
  }
 
  export function clearAuthData() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('_idUser');
    } catch (error) {
      throw new Error("Objetos no encontrados para remover");
    }
  }
  