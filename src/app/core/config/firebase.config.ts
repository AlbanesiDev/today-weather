import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { getMessaging, provideMessaging } from "@angular/fire/messaging";

import { environment } from "../../../environments/environment";

export const firebaseConfig = [
  provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFIG)),
  provideAuth(() => getAuth()),
  provideStorage(() => getStorage()),
  provideFirestore(() => getFirestore()),
  provideMessaging(() => getMessaging()),
];
