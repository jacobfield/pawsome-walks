export default async function getProfilePicUrl(searchId){
    try {
const {ownerId, picId} = searchId;

const response = await fetch(
        
    }
}



// plan:
// write out 3 get requests for owners table
// need to search by matching picid & ownerid, picid & walkid, and picid & dogid