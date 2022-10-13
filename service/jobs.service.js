const Jobs = require("../model/Jobs");


module.exports.createAJobService=async(data)=>{
    const result = await Jobs.create(data)
    return result
}

module.exports.getJobsService=async(filters, queries)=>{
  const jobs = await Jobs.find(filters)
  .skip(queries.skip)
  .limit(queries.limit)
  .select(["-applyCandidate"])
  .sort(queries.sortBy)


const total = await Jobs.countDocuments(filters)
const page = Math.ceil(total / queries.limit)
return { total, page, jobs };

}
module.exports.getManagerCreatedJobsService=async(email)=>{
    const result = await Jobs.find({email})
    // .select(["-applyCandidate"])
    return result
}


module.exports.getJobByIdService = async (id) => {
  const job = await Jobs.findById({ _id: id })
  return job;
}

module.exports.getManagerCreatedJobsByIdService = async (id) => {
  const job = await Jobs.findById({ _id: id })
  return job;
}


module.exports.updateJobService = async (id, data) => {
  const result = await Jobs.updateOne({ _id: id }, data, {
    runValidators: true
  });
  return result;
}

module.exports.applyJobService = async (id, data) => {
  const result = await Jobs.updateOne({ _id: id }, {applyCandidate:data},{
    runValidators:true
  });
  return result;
}
