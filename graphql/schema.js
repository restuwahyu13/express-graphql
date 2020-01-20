const { buildSchema } = require('graphql');

const Schema = buildSchema(`

  type Query {

     findAllDosen(limit: Int!) : [Dosen!]!
     findAllSkripsi(limit: Int!) : [Skripsi!]!
     findAllMahasiswa(limit: Int!): [Mahasiswa!]!
     
     findOneMahasiswa(id: ID!): Mahasiswa
     findOneDosen(id: ID!) : Dosen
     findOneSkripsi(id: ID!) : Skripsi
  }

  type Mutation {

     insertOneMahasiswa(input: inputMahasiswa!) : Mahasiswa!
     insertOneDosen(input: inputDosen!) : Dosen!
     insertOneSkripsi(input: inputSkripsi!) : Skripsi!

     updateOneMahasiswa(id: ID! input: inputMahasiswa!) : Mahasiswa!
     updateOneDosen(id: ID! input: inputDosen!) : Dosen!
     updateOneSkripsi(id: ID! input: inputSkripsi!) : Skripsi!

     deleteOneMahasiswa(id: ID!) : Mahasiswa!
     deleteOneDosen(id: ID!) :  Dosen!
     deleteOneSkripsi(id: ID!) :Skripsi!
  }

 input inputMahasiswa {

   id: ID
   nama: String
   npm: String
   fak: String
   ta: ID
   dp: ID
   
  }

  input inputDosen {

   id: ID
   nama: String
   lulusan: String
   gelar: String

  }

  input inputSkripsi {

     id: ID
     judul: String
     programming: String
     type: String
  }

  type Mahasiswa {

      id: ID
      nama: String!
      npm: String!
      fak: String!
      ta: Skripsi
      dp: Dosen
  }

  type Dosen {

     id: ID
     nama: String!
     lulusan: String!
     gelar: String!
  }

  type Skripsi {

     id: ID
     judul: String!
     programming: String!
     type: String!
  }

`);

module.exports = Schema;