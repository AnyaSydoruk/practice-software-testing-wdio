import RegisterPage from "../po/register.page.js";
import LoginPage from "../po/login.page.js";
import { newUser } from "../data/users.js";

export async function createAndLoginUser() {
  const user = newUser();
  await RegisterPage.open();
  await RegisterPage.register(user);
  await LoginPage.loginAs(user);
  return user;
}
