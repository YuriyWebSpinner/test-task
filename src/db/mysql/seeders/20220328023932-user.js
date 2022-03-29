const bcrypt = require("bcrypt");

module.exports = {
  async up (queryInterface) {
    const usersData = [];
    for (let i = 0; i<5; i++) {
      const password1 = await bcrypt.hash('testpwdmail', 3);
      const password2 = await bcrypt.hash('testpwdphone', 3);
      usersData.push(
          {
            id: `test${i}@gmail.com`,
            password: password1
          },
          {
            id: `+353123000456${i}`,
            password: password2
          }
      )
    }
    await queryInterface.bulkInsert('users', usersData, {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};