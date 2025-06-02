import strawberry
from .types import Query, Mutation

schema = strawberry.Schema(query=Query, mutation=Mutation)