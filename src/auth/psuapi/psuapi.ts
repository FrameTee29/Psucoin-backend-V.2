import * as soap from 'soap';

export default function loginPSUPassport(psuPassport, password) {
    const PSU_URL = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
    return new Promise((resolve, reject) => {
        soap.createClient(PSU_URL, (err, client) => {
            if (err) return reject(err);
            let user = {username: psuPassport,password: password}
            client.GetStaffDetails(user, (err, response) => {
                if (err) return reject(err);
                else
                    return resolve(response.GetStaffDetailsResult.string);
            })
        })
    })
}