export const EXISTING_USER = {
  email: "customer@practicesoftwaretesting.com",
  password: "welcome01",
};

export const newUser = () => ({
  firstName: "Anna",
  lastName: "Test",
  email: `anna.test.${Date.now()}@example.com`,
  password: "Welcome01!",
  phone: "0501234567",
});
