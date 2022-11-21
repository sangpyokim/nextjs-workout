import { child, get, ref } from "firebase/database";
import { database } from "../../firebase";

export const getAllExercises = () => {
    return new Promise((res, req) => {

        const dbRef = ref(database)
        get(child(dbRef, 'exercises'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                res(snapshot.val())
            } else {
                req("No data available");
        }
        }).catch((error) => {
            req(error);
        });
    })
}