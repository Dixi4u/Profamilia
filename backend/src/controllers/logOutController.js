const logoutController = {};

logoutController.logout = async (rec, res)=> {
    //Borrar la cookie de "authToken"
    res.clearCookie("authToken")

    return res.json({message: "Serrion terminada"})
};

export default logoutController;