import { g, auth, config } from '@grafbase/sdk'

const { NEXTAUTH_SECRET, } = process.env;

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

const User: any = g.model('User', {
  name: g.string().length({ min: 2, max: 100 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 2, max: 1000 }).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(), 
  projects: g.relation(() => Project).list().optional(),

  // Extend models with resolvers
  // https://grafbase.com/docs/edge-gateway/resolvers
  // gravatar: g.url().resolver('user/gravatar')
}).auth((rules) => {
  rules.public().read()
});

export const Project: any = g.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string().optional(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User)
}).auth((rules) => {
  rules.public().read,
  rules.private().create().update().delete()
});

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => {
      rules.private()
    }
  }
});
