

export const TOKEN_KEY = "@integralMill-AccessToken";//"@airbnb-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (objeto) => {
  localStorage.setItem("cod_usuario", objeto.cod_usuario);
  localStorage.setItem("nome", objeto.nome);
  localStorage.setItem("email", objeto.email)
  localStorage.setItem(TOKEN_KEY, objeto.accessToken);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("cod_usuario");
  localStorage.removeItem("nome");
  localStorage.removeItem("email");
}; 