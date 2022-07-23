exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "Diego",
          password:
            "$2b$10$mUoanB/fcEh9sUTYQHz9dOIFuaGNGmG.gVQZLEOFLtgmCN3xbu7za",
          email: "ddzadravec@gmail.com",
          phone: "11945123724",
          address: "",
          photo: "",
          type: "user",
          needToUpdate: true,
          isJoining: false,
          manualRegistration: false,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          name: "Fausen",
          password:
            "$2b$05$8AIHSWaw/.Nhd5LS1fkQreAjWev2A9UpL6d5jsJuucnPci8wDG47u",
          email: "fausencauan321@gmail.com",
          phone: "",
          address: "",
          photo: "",
          type: "admin",
          needToUpdate: false,
          isJoining: false,
          manualRegistration: false,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          name: "lindacosata",
          password:
            "$2b$10$3S.pyz7707hUziJEPh1Y5uBPgqvCCCtEstsjaJhu3gxdB1pkhaZFO",
          email: "lindacosata@gmail.com",
          phone: "",
          address: "",
          photo: "",
          type: "admin",
          needToUpdate: false,
          isJoining: false,
          manualRegistration: false,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          name: "andresiqueiradroid",
          password:
            "$2b$10$QeHWQmvU8YrVUSUiKDhrre7ql7eUXwNEFbN7.YyfJ1IWfTTddcvDS",
          email: "andresiqueiradroid@gmail.com",
          phone: "",
          address: "",
          photo: "",
          type: "admin",
          needToUpdate: false,
          isJoining: false,
          manualRegistration: false,
          status: "active",
          createdAt: new Date().toISOString(),
        },
      ]);
    });
};
