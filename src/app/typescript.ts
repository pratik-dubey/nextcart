// Union

// import { log } from "console";

// type Admin = {
//   role: "admin";
//   permissions: string;
// };

// type User = {
//   role: "user";
//   loyaltyPoints: number;
// };

// function describeingUsingInOperator(u: Admin | User) {
//   if ("permissions" in u) {
//     console.log("Role is :- ", u.role);
//   } else {
//     console.log("Role is :- ", u.role);
//   }
// }

// describeingUsingInOperator({ role: "admin", permissions: "allowed" });

// function roleSpecification(u: Admin | User) {
//   if (u.role === "admin") {
//     console.log("Role is :- ", u.role);
//   } else {
//     console.log("Role is :- ", u.role);
//   }
// }

// const arrOfUnion: (string | number)[] = ["a", 1, "b"];

// const unionOfArrays: string[] | number[] =
//   Math.random() > 0.1 ? ["a", "v"] : [1, 4, 5];
