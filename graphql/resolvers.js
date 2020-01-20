const Mahasiswa = require('../models/Mahasiswa');
const Dosen = require('../models/Dosen');
const Skripsi = require('../models/Skripsi');
const { ErrorValidation } = require('../helpers/ErrorValidation');

//resolvers (Query)
const Resolvers = {

        //fungsi tambah mahasiswa
        insertOneMahasiswa: async({ input }, args, context) => {

            //get value from fields
            const { nama, npm, fak } = input;

            //check fileds
            if (nama === '' || npm === '' || fak === '') {

                //throw error if fields is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'Field Is Required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking data from database
                if (await Mahasiswa.findOne({ nama: nama, npm: npm })) {

                    //throw error if data already exist from database
                    const errors = [{

                        status: "Conflict",
                        code: args.statusCode = 409,
                        method: args.method,
                        message: args.statusMessage = 'Data Already Exist'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    //store data to database
                    const data = new Mahasiswa(input);
                    await data.save(() => {

                        console.log('Data Hasbeen Created');
                    });

                    return input;
                }
            }
        },

        //fungsi tambah data dosen
        insertOneDosen: async({ input }, args, context) => {

            //get value from fields
            const { nama, lulusan, gelar } = input;

            //check fields
            if (nama === '' || lulusan === '' || gelar === '') {

                //throw error if fields is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'value is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking data from database
                if (await Dosen.findOne({ nama: nama })) {

                    //throw error if data already exist from database
                    const errors = [{

                        status: "Conflict",
                        code: args.statusCode = 409,
                        method: args.method,
                        message: args.statusMessage = 'data already exist'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    //store data to database
                    const data = new Dosen(input);
                    await data.save(() => {

                        console.log('Data Hasbeen Created');
                    });

                    return input;
                }
            }
        },

        //fungsi tambah skripsi
        insertOneSkripsi: async({ input }, args, context) => {

            //get value from fields
            const { judul, programming, type } = input;

            //checking fields
            if (judul === '' || programming === '' || type === '') {

                //throw error if fields is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'value is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking data from database
                if (await Skripsi.findOne({ judul: judul })) {

                    //throw error if data already exist from database
                    const errors = [{

                        status: "Conflict",
                        code: args.statusCode = 409,
                        method: args.method,
                        message: args.statusMessage = 'data already exist'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    //store data to database
                    const data = new Skripsi(input);
                    await data.save(() => {

                        console.log('Data Hasbeen Created');
                    });

                    return input;
                }
            }
        },

        //result mahasiswa maximal 1
        findOneMahasiswa: async({ id }, args, context) => {

            //checking field
            if (id === '') {

                //throw error if id is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'id is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking id if to longger
                if (id.length < 24 || id.length > 24) {

                    //throw error if id is blank
                    const errors = [{

                        status: "ID Too Long | ID Too Short",
                        code: args.statusCode = 201,
                        method: args.method,
                        message: args.statusMessage = 'id not match because it`s too long / short'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    //checking data from database
                    if (await Mahasiswa.findById(id)) {

                        //result data to display
                        return await Mahasiswa.findById(id)
                            .populate('ta dp', 'judul programming type nama lulusan gelar');

                    } else {

                        //throw error if data not found from database
                        const errors = [{

                            status: "Error",
                            code: args.statusCode = 404,
                            method: args.method,
                            message: args.statusMessage = 'data not found or deleted'
                        }];

                        throw new ErrorValidation(errors);
                    }
                }
            }
        },

        //result dosen maximal 1
        findOneDosen: async({ id }, args, context) => {

            //checking field
            if (id === '') {

                //throw error if id is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'id is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking id if to longger
                if (id.length < 24 || id.length > 24) {

                    //throw error if id is blank
                    const errors = [{

                        status: "ID Too Long | ID Too Short",
                        code: args.statusCode = 201,
                        method: args.method,
                        message: args.statusMessage = 'id not match because it`s too long or short'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    //checking data from database
                    if (await Dosen.findById(id)) {

                        //result data to display
                        return await Dosen.findById(id);

                    } else {

                        //throw error if data not found from database
                        const errors = [{

                            status: "Error",
                            code: args.statusCode = 404,
                            method: args.method,
                            message: args.statusMessage = 'data not found or deleted'
                        }];

                        throw new ErrorValidation(errors);
                    }
                }
            }
        },

        //result dosen maximal 1
        findOneSkripsi: async({ id }, args, context) => {

            if (id === '') {

                //throw error if id is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'id is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking id if to longger
                if (id.length < 24 || id.length > 24) {

                    //throw error if id is blank
                    const errors = [{

                        status: "ID Too Long | ID Too Short",
                        code: args.statusCode = 201,
                        method: args.method,
                        message: args.statusMessage = 'id not match because it`s too long or short'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    //check data from database
                    if (await Skripsi.findById(id)) {

                        //result data to display
                        return await Skripsi.findById(id);

                    } else {

                        //throw error if data not found from database
                        const errors = [{

                            status: "Error",
                            code: args.statusCode = 404,
                            method: args.method,
                            message: args.statusMessage = 'data not found or deleted'
                        }];

                        throw new ErrorValidation(errors);
                    }
                }
            }
        },

        //result all data mahasiswa
        findAllMahasiswa: async({ limit }, args, context) => {

            //result all data to display
            return await Mahasiswa.find({})
                .populate('ta dp', 'judul programming type nama lulusan gelar').limit(limit)
        },

        //result all data dosen
        findAllDosen: async({ limit }, args, context) => {

            //result all data to display
            return await Dosen.find({}).limit(limit);
        },

        //result all data skripsi
        findAllSkripsi: async({ limit }, args, context) => {

            //result all data to display
            return Skripsi.find({}).limit(limit);
        },

        //hapus data mahasiswa
        deleteOneMahasiswa: async({ id }, args, context) => {

            //checking field
            if (id === '') {

                //throw error if id is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'id or value is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking id if to longger
                if (id.length < 24 || id.length > 24) {

                    //throw error if id is blank
                    const errors = [{

                        status: "ID Too Long | ID Too Short",
                        code: args.statusCode = 201,
                        method: args.method,
                        message: args.statusMessage = 'id not match because it`s too long or short'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    //check data from database
                    if (await Mahasiswa.findById(id)) {

                        //delete data from database
                        return Mahasiswa.findByIdAndDelete(id)
                            .populate('ta dp', 'judul programming type nama lulusan gelar');

                    } else {

                        //throw error if data not found from database
                        const errors = [{

                            status: "Error",
                            code: args.statusCode = 404,
                            method: args.method,
                            message: args.statusMessage = 'data not found or deleted'
                        }];

                        throw new ErrorValidation(errors);
                    }
                }
            }
        },

        //hapus data dosen
        deleteOneDosen: async({ id }, args, context) => {

            //checking field
            if (id === '') {

                //throw error if id is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'id or value is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking id if to longger
                if (id.length < 24 || id.length > 24) {

                    //throw error if id is blank
                    const errors = [{

                        status: "ID Too Long | ID Too Short",
                        code: args.statusCode = 201,
                        method: args.method,
                        message: args.statusMessage = 'id not match because it`s too long or short'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    //check data from database
                    if (await Dosen.findById(id)) {

                        //delete data from database
                        return Dosen.findByIdAndDelete(id);

                    } else {

                        //throw error if data not found from database
                        const errors = [{

                            status: "Error",
                            code: args.statusCode = 404,
                            method: args.method,
                            message: args.statusMessage = 'data not found or deleted'
                        }];

                        throw new ErrorValidation(errors);
                    }
                }
            }
        },

        //hapus data skripsi
        deleteOneSkripsi: async({ id }, args, context) => {

            //checking field
            if (id === '') {

                //throw error if id is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'id or value is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking id if to longger
                if (id.length < 24 || id.length > 24) {

                    //throw error if id is blank
                    const errors = [{

                        status: "ID Too Long | Too Short",
                        code: args.statusCode = 201,
                        method: args.method,
                        message: args.statusMessage = 'id not match because it`s too long or short'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    //check data from database
                    if (await Skripsi.findById(id)) {

                        //delete data from database
                        return Skripsi.findByIdAndDelete(id);

                    } else {

                        //throw error if data not found from database
                        const errors = [{

                            status: "Error",
                            code: args.statusCode = 404,
                            method: args.method,
                            message: args.statusMessage = 'data not found or deleted'
                        }];

                        throw new ErrorValidation(errors);
                    }
                }
            }

        },

        //perbarui data mahasiswa
        updateOneMahasiswa: async({ id, input }, args, context) => {

            const { nama, npm, fak } = input;

            if (id === '' || nama === '' || npm === '' || fak === '') {

                //throw error if id is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'id or value is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking id if too long or short
                if (id.length < 24 || id.length > 24) {

                    //throw error if id is blank
                    const errors = [{

                        status: "ID Too Long | ID Too Short",
                        code: args.statusCode = 201,
                        method: args.method,
                        message: args.statusMessage = 'id not match because it`s too long or short'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    //checking data from data base
                    if (await Mahasiswa.findById(id)) {

                        //update old data to new data
                        await Mahasiswa.updateOne({ _id: id }, input);

                        return input;

                    } else {

                        //throw error if data not found from database
                        const errors = [{

                            status: "Error",
                            code: args.statusCode = 404,
                            method: args.method,
                            message: args.statusMessage = 'update data fail data not found or deleted'
                        }];

                        throw new ErrorValidation(errors);
                    }
                }
            }
        },

        //perbarui data mahasiswa
        updateOneDosen: async({ id, input }, args, context) => {

            const { nama, lulusan, gelar } = input;

            if (id === '' || nama === '' || lulusan === '' || gelar === '') {

                //throw error if id is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'id or value is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking id if to longger
                if (id.length < 24 || id.length > 24) {

                    //throw error if id is blank
                    const errors = [{

                        status: "ID Too Long | ID Too Short",
                        code: args.statusCode = 201,
                        method: args.method,
                        message: args.statusMessage = 'id not match because it`s too long or short'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    if (await Dosen.findById(id)) {

                        //update old data to new data
                        await Dosen.updateOne({ _id: id }, input);

                        return input;

                    } else {

                        //throw error if data not found from database
                        const errors = [{

                            status: "Error",
                            code: args.statusCode = 404,
                            method: args.method,
                            message: args.statusMessage = 'update data fail data not found or deleted'
                        }];

                        throw new ErrorValidation(errors);
                    }
                }
            }
        },

        //perbarui data mahasiswa
        updateOneSkripsi: async({ id, input }, args, context) => {

            const { judul, programming, type } = input;

            if (id === '' || judul === '' || programming === '' || type === '') {

                //throw error if id is blank
                const errors = [{

                    status: "Required",
                    code: args.statusCode = 201,
                    method: args.method,
                    message: args.statusMessage = 'id or value is required'
                }];

                throw new ErrorValidation(errors);

            } else {

                //checking id if to longger
                if (id.length < 24 || id.length > 24) {

                    //throw error if id is blank
                    const errors = [{

                        status: "ID Too Long | ID Too Short",
                        code: args.statusCode = 201,
                        method: args.method,
                        message: args.statusMessage = 'id not match because it`s too long or short'
                    }];

                    throw new ErrorValidation(errors);

                } else {

                    if (await Skripsi.findById(id)) {

                        await Skripsi.updateOne({ _id: id }, input);

                        return input;

                    } else {

                        //throw error if data not found from database
                        const errors = [{

                            status: "Error",
                            code: args.statusCode = 404,
                            method: args.method,
                            message: args.statusMessage = 'update data fail data not found / deleted'
                        }];

                        throw new ErrorValidation(errors);
                    }

                }
            }

        }

    } //end resolvers


module.exports = Resolvers;