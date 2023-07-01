import { GraphQLClient } from "graphql-request";
import { createProjectMutation, createUserMutation, getUserQuery } from "@/graphql";
import { ProjectForm } from "@/common.types";

const {
  NEXT_PUBLIC_GRAFBASE_API_URL, NODE_ENV, NEXT_PUBLIC_GRAFBASE_API_KEY, NEXT_PUBLIC_SERVER_URL
} = process.env;

const isProduction = NODE_ENV === "production";
const apiUrl = isProduction ? NEXT_PUBLIC_GRAFBASE_API_URL || "" : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction ? NEXT_PUBLIC_GRAFBASE_API_KEY || "" : "letmein";
const serverUrl = isProduction ? NEXT_PUBLIC_SERVER_URL : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async(query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch(err) {
    throw new Error(`error while making graphql request -> ${err}`);
  }
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
}

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createuser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = { input: { name, email, avatarUrl }};
  
  return makeGraphQLRequest(createUserMutation, variables);
};

export const uploadImage = async (imagePath: string) => {
  try {
    const res = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath })
    });

    return res.json();
  } catch (err) {
    throw new Error(`There was a problem uploading a project image -> ${err}`);
  }
}

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);
  
  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    input: {
      ...form,
      image: imageUrl.url,
      createdBy: { link: creatorId }
    }
  };

  if (imageUrl.url) {
    return makeGraphQLRequest(createProjectMutation, variables);
  }
}
