export function isLoggedIn():boolean {
  return localStorage.getItem("access_token")!==null && localStorage.getItem("access_token")!=="undefined";
}

export function deleteTokens():void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
}
