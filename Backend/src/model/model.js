const dbConn = require("../../config/configuration");

const registerUser = async (user_name, user_password, user_email) => {
    try {
        const sql = "CALL cipherbytes.insertUserDetails(?,?,?)"
        const results = await dbConn.query(sql, [user_name,user_password,user_email])
        return results;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
}


const userLoginDetails = async (user_email,user_password) => {
    const sql = "CALL cipherbytes.GetUserDetailsByEmailAndPassword(?,?)";
    const result = dbConn.query(sql, [user_email,user_password]);
    //console.log(result,"result")
    return result;
};

module.exports = {
    registerUser,userLoginDetails
};