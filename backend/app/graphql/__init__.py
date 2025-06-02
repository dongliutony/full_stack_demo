from strawberry.fastapi import GraphQLRouter
from app.graphql.schema import schema

graphql_app = GraphQLRouter(schema) 
