import { Injectable, inject, signal } from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  user,
} from "@angular/fire/auth";
import { GoogleAuthProvider, getAuth } from "@firebase/auth";
import { UserInterface } from "../interface/user.interface";
import { Observable, from } from "rxjs";

/**
 * A service that provides authentication functionalities using Firebase.
 */
@Injectable({
  providedIn: "root",
})
export class AuthService {
  /**
   * Injects the Firebase Auth object for authentication operations.
   */
  private firebaseAuth = inject(Auth);

  /**
   * An observable signal representing the current user's state.
   */
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  /**
   * An observable signal indicating whether the user is authenticated.
   */
  userAuthSig = signal<boolean>(false);

  /**
   * An observable of the user's authentication state.
   */
  user$ = user(this.firebaseAuth);

  /**
   * Registers a new user with an email and password, and updates their profile with a username.
   * @param username The display name of the user.
   * @param email The email address of the user.
   * @param password The password for the user's account.
   * @returns An observable that completes when the registration is finished.
   */
  public registerWithEmail(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => {})
      .catch((error) => {});
    return from(promise);
  }

  /**
   * Signs in a user with an email and password.
   * @param email The email address of the user.
   * @param password The password for the user's account.
   * @returns An observable that completes when the sign-in is finished.
   */
  public loginWithEmail(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((res) => {})
      .catch((error) => {});
    return from(promise);
  }

  /**
   *
   * @returns An Promise
   */
  public async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithRedirect(auth, provider)
      .then(() => {
        // El usuario ha sido redirigido y ha iniciado sesión.
      })
      .catch((error: any) => {
        return error;
      });
  }

  /**
   * Signs out the current user.
   * @returns A promise that resolves when the sign-out is complete.
   */
  public async signOut(): Promise<void> {
    const auth = getAuth();
    return signOut(auth)
      .then((res) => {})
      .catch((error) => {});
  }

  public async sendPasswordResetEmail(email: string) {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email)
      .then((res) => {})
      .catch((error) => {});
  }
}
