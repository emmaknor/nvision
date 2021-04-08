/* eslint-disable new-cap */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
const db = require('../../../db/index');

const credentialsObject = async (credentials) => {
    // In futre hash password here using argon2
    //returns a user or nothing if username doesn't exist
    var user = await db.getUser(credentials.email);
    if (user !== null) {
        user.verdict = credentials.password === user.password ?
            true : false;
        return user;

    } else {
        let user = {
            verdict: false
        }
        return user;
    }
}


const providers = [
    Providers.Credentials({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'text', placeholder: 'vision@gmail.com' },
            password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials) => {
            //set global flag to be credentials
            //if credentials match 
            const user = await credentialsObject(credentials);
            if (user.verdict) {
                //return user to callback
                return user;
            } else {
                //reject credentials
                return null;
            }
        },
    }),
    //add google auth - how to make it persist if it doesn't already?  I'd like to continue with JWT
    Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
]

const callbacks = {
    // After authorization come here
    // get the JWT token from API response
  
    async signIn(user, account, profile, session) {
        if (account.provider === 'google') {
            //verify they are a google user
            if (profile.verified_email === true) {
                //verify they are a nvision user
                var nvisionUser = await db.getUser(profile.email);
                if (nvisionUser !== null) {
                    //how to pass user information into session?
                    user = nvisionUser
                    //verified nvision user
                    return user;
                } else {
                    //not an nvision user
                    return false;
                }
            } else {
                //they are not with google
                return false
            }
        } else if (account.provider === undefined) {
            //we are in a credentials session (username, password), return that
            return session;
        }
    },
    async jwt(token, user) {
        user && (token.user = user);
        return token;
    },
    async session(session, token) {
        //add user to session
        session.user = token.user;
        return session;
    }
}
// &&
// profile.email.endsWith('@gmail.com')
const session = {
    // aging the session to expire at 12 hours (displays in zulu time)
    // update age seems to be how often the server checks for expiration
    jwt: true,
    maxAge: 12 * 60 * 60,
    updateAge: 60 * 60 * 1,
};


const options = {
    providers,
    session,
    callbacks,
};


export default (req, res) => NextAuth(req, res, options);
// signIn() passed in info with google auth

// profile:  {
//     id: '108073109942218026529',
//     email: 'orendnelson@gmail.com',
//     verified_email: true,
//     name: 'Oren Nelson',
//     given_name: 'Oren',
//     family_name: 'Nelson',
//     picture: 'https://lh3.googleusercontent.com/a-/AOh14GgnT27vgFPsZLGit_vSjaQtW-Fa2nb30ZL-MfmjQA=s96-c',
//     locale: 'en'
//   }
//   account:  {
//     provider: 'google',
//     type: 'oauth',
//     id: '108073109942218026529',
//     accessToken: 'ya29.a0AfH6SMCmppuUpTvU4wtz1cMHYhJ_M7uBLDKb4FLxk2C5kQsAn4zglbKeNRpWmwYbHm78IOeOkGeyAFrHLOR0_EecBbn1-9YH9uZ_kcWuAyMOSgpvlnpta-DT7cWN1WWv74Cz-y06e4L7WwLt9vpkU28ESg3F',
//     accessTokenExpires: null,
//     refreshToken: undefined,
//     idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxYWMzOWI2Y2NlZGEzM2NjOGNhNDNlOWNiYzE0ZjY2ZmFiODVhNGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzIyMTc1ODM2NTAxLWdua2gxbnQ5dW51OGs5dXZmcTJrYTAzbG9kOG5qMG9qLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzIyMTc1ODM2NTAxLWdua2gxbnQ5dW51OGs5dXZmcTJrYTAzbG9kOG5qMG9qLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4MDczMTA5OTQyMjE4MDI2NTI5IiwiZW1haWwiOiJvcmVuZG5lbHNvbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Indla2JsWVBBWGpIOC1wM1lNRkRyZ3ciLCJpYXQiOjE2MTc5MDQ1ODEsImV4cCI6MTYxNzkwODE4MX0.D38dLU93-Ukn_JIlyxp0eOzfq0bkZ3fgJhNb-h-FOS1BcDSmMuwWgAfKK5C2gMyfkZERcwV16gRKutGZ9wiHcXMr03VBNXvDA4feVHVqC2AL2Chag8FHTFgo_-E2NB0PYwMYMuXD4V7OAlXixtIijJ-ZU7UPmfyqyMX9plqIrCNKVLGom-ERJ0ZatX9IPahipvO1tzxyjRweU-bF3qfvmC043vft41tcQKLRJ7vlXV5E0uFbOcA7iYmdkSFJD9iLenDmfQB-AkYewnwQK59reeemKPn3mS85l-iLPSugFdsQdjetpIvpd-WhH1mr7K8JmVGu37cCZ7biE23hy7kUbg',
//     access_token: 'ya29.a0AfH6SMCmppuUpTvU4wtz1cMHYhJ_M7uBLDKb4FLxk2C5kQsAn4zglbKeNRpWmwYbHm78IOeOkGeyAFrHLOR0_EecBbn1-9YH9uZ_kcWuAyMOSgpvlnpta-DT7cWN1WWv74Cz-y06e4L7WwLt9vpkU28ESg3F',
//     expires_in: 3599,
//     scope: 'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
//     token_type: 'Bearer',
//     id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxYWMzOWI2Y2NlZGEzM2NjOGNhNDNlOWNiYzE0ZjY2ZmFiODVhNGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzIyMTc1ODM2NTAxLWdua2gxbnQ5dW51OGs5dXZmcTJrYTAzbG9kOG5qMG9qLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzIyMTc1ODM2NTAxLWdua2gxbnQ5dW51OGs5dXZmcTJrYTAzbG9kOG5qMG9qLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4MDczMTA5OTQyMjE4MDI2NTI5IiwiZW1haWwiOiJvcmVuZG5lbHNvbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Indla2JsWVBBWGpIOC1wM1lNRkRyZ3ciLCJpYXQiOjE2MTc5MDQ1ODEsImV4cCI6MTYxNzkwODE4MX0.D38dLU93-Ukn_JIlyxp0eOzfq0bkZ3fgJhNb-h-FOS1BcDSmMuwWgAfKK5C2gMyfkZERcwV16gRKutGZ9wiHcXMr03VBNXvDA4feVHVqC2AL2Chag8FHTFgo_-E2NB0PYwMYMuXD4V7OAlXixtIijJ-ZU7UPmfyqyMX9plqIrCNKVLGom-ERJ0ZatX9IPahipvO1tzxyjRweU-bF3qfvmC043vft41tcQKLRJ7vlXV5E0uFbOcA7iYmdkSFJD9iLenDmfQB-AkYewnwQK59reeemKPn3mS85l-iLPSugFdsQdjetpIvpd-WhH1mr7K8JmVGu37cCZ7biE23hy7kUbg'
//   }
//   user:  {
//     id: '108073109942218026529',
//     name: 'Oren Nelson',
//     email: 'orendnelson@gmail.com',
//     image: 'https://lh3.googleusercontent.com/a-/AOh14GgnT27vgFPsZLGit_vSjaQtW-Fa2nb30ZL-MfmjQA=s96-c'
//   }

// signIn() passed in info with provider credentials
// user {
//     id: 1,
//     firstname: 'Oren',
//     lastname: 'Nelson',
//     password: '1',
//     caloriegoal: 5000,
//     watergoal: 10000,
//     weightgoal: 1,
//     phone: '3216039803',
//     email: 'orendnelson@gmail.com',
//     sex: 'male',
//     verdict: true
//   }
//   account:  { id: 'credentials', type: 'credentials' }
//   profile [Object: null prototype] {
//     csrfToken: '2bfd005a6ae728d60990230b9453aab10e88332cf21e45bf3aff9bd75f79fa3a',
//     email: 'orendnelson@gmail.com',
//     password: '1'
//   }