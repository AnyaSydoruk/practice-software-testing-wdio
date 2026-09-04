import RegisterPage from "#business/pages/register.page.js";
import LoginPage from "#business/pages/login.page.js";
import { newUser } from "#business/data/users.js";

export async function registerAndLogin() {
  const user = newUser();

  await RegisterPage.open();
  await RegisterPage.register(user);
  await LoginPage.loginAs(user);

  return user;
}
