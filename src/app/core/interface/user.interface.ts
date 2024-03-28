export interface UserInterface {
  id?: string;
  username: string;
  email: string;
  password: string;
  displayName?: string;
  photoURL?: string;
  teamIds?: string[];
  createdAt?: Date;
}
