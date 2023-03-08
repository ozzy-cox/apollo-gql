import PeopleData from "../PeopleData.json" assert { type: 'json' }
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const typeDefs = `#graphql
    type Person {
        id: Int
        gender: String
        height: Float
        weight: Float
        age: Int
        class: String
        country: String
        salary: Float
        birth_date: String
        height_decimal: Float

    }

    type Query {
        person(id: Int): Person 
        people: [Person]
    }
`
type Person = {
    id: number
    gender: string
    height: number
    weight: number
    age: number
    class: string
    country: string
    salary: number
    birth_date: string
    height_decimal: number

}

const resolvers = {
    Query: {
        people: () => PeopleData,
        person: (_: any, { id }: any) => PeopleData.find((person: Person) => person.id === id)
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server)

console.log(`Server is ready at ${url}`)