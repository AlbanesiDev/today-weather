import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
//firestore
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getStorage, provideStorage } from "@angular/fire/storage";
//auth
import { getAuth, provideAuth } from "@angular/fire/auth";
// Environments
import { environment } from "../../../environments/environment";

const provideFirebase: EnvironmentProviders = importProvidersFrom(
  provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFIG)),
  provideAuth(() => getAuth()),
  provideStorage(() => getStorage()),
);

export { provideFirebase };
