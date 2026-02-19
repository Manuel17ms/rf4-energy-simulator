import mongoose from 'mongoose'

export async function connectDB(uri) {

  try {

    await mongoose.connect(uri)
    console.log('MongoDB connected')

  } catch (error) {

    console.error(error)


    if (process.env.NODE_ENV !== 'test') {
      process.exit(1)
    }

    throw error
  }

}




