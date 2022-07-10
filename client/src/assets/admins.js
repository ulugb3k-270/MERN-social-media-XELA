const admins = ["62c5dc28b293f7e593d1e1a0"];

const checkAdmin = (id) => {
  for (let i = 0; i < admins.length; i++) {
    if (admins[i] === id) {
      return true;
    }
  }
  return false;
};


export default checkAdmin
