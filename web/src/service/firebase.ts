import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyB6NXOgiTnYGSli1GwdysWOcXJa0_FreJU",
	authDomain: "revivios.firebaseapp.com",
	projectId: "revivios",
	storageBucket: "revivios.appspot.com",
	messagingSenderId: "510239844080",
	appId: "1:510239844080:web:cf572e1ed780bec1bc0435",
	measurementId: "${config.measurementId}",
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
