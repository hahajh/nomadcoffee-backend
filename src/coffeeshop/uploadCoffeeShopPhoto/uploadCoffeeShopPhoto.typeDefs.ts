import { gql } from "apollo-server";

export default gql`
    type UploadCoffeeShopPhotoResult {
        ok: Boolean!
        error: String,
        coffeeShopPhoto: CoffeeShopPhoto
    }
    type Mutation {
        uploadCoffeeShopPhoto(coffeeShopId: Int!, file: Upload!): UploadCoffeeShopPhotoResult
    }
`;