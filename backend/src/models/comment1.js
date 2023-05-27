/*tokens: An array of token objects, where each object has a token field of type string. This is used for storing authentication tokens.
Additionally, the schema includes the option timestamps: true, which automatically adds createdAt and updatedAt fields to the user document.

The userSchema.virtual() method defines a virtual field called notes. It specifies that the User model is related to the Note model using the owner field of the Note model and the _id field of the User model.

The userSchema.methods.toJSON() method is defined to modify the JSON representation of the user object returned by Mongoose. It removes sensitive fields like password and tokens from the object.

The userSchema.methods.generateAuthToken() method generates a JWT (JSON Web Token) for the user. It signs the user's _id with a secret key specified in the process.env.NOTER_JWT_SECRET environment variable. The generated token is stored in the tokens array of the user and saved to the database.

The userSchema.statics.findByCredentials() method is a static method that finds a user by their username and checks if the provided password matches the hashed password stored in the database. It throws an error if the user is not found or if the password doesn't match.

The userSchema.pre("save") middleware function is executed before saving a user document. It checks if the password field has been modified (or is new) and hashes the password using bcrypt with a salt factor of 8.

The userSchema.pre("remove") middleware function is executed before removing a user document. It deletes all the notes associated with the user.

Finally, the User model is created using mongoose.model(), and the model is exported for use in other parts of the application.

This schema defines the structure, methods, and middleware for interacting with user documents in MongoDB using Mongoose. */