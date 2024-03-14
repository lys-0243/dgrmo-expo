import IMAGES from "../../assets/img/profil";

export const users = [
  {
    id: 1,
    name: "Samuel Kalenga",
    email: "demo@gmail.com",
    password: "123456",
    created_at: "2019-07-25 14:00:00",
    updated_at: "2019-07-25 14:00:00",
    photo: IMAGES.user1,
  },
];

// export let isLogged = false;
export function UserIsLogged(setValue?: boolean) {
  let isLogged = false;
  setValue ? (isLogged = setValue) : (isLogged = false);
  console.log(setValue);

  return isLogged;
}
