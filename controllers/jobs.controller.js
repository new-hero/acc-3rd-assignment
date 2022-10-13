const {
    createAJobService,
    getJobsService,
    getJobByIdService,
    updateJobService,
    getManagerCreatedJobsService,
    getManagerCreatedJobsByIdService,
    applyJobService
} = require("../service/jobs.service");


module.exports.createAJob = async (req, res, next) => {
    try {  

        const user=req.user
        const creator= user.email
        req.body.creator=creator

        const result = await createAJobService(req.body);
        
        res.status(200).json({
            status: "success",
            message: "A new job create successfully!",
            data: result})
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            error: "Couldn't create the Job"
        })
    }
}

//


exports.getJobs = async (req, res, next) => {
    try {
        console.log(req.query)

        let filters = { ...req.query };

        const excludeFields = ['fields','sort', 'page', 'limit']
        excludeFields.forEach(field => delete filters[field])
    
        //gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
    
        filters = JSON.parse(filtersString)
    
    
        const queries = {}
    
        if (req.query.sort) {
          const sortBy = req.query.sort.split(',').join(' ')
          queries.sortBy = sortBy
        }
    
        if (req.query.fields) {
          const fields = req.query.fields.split(',').join(' ')
          queries.fields = fields
        }
            
        if (req.query.page) {
    
          const { page = 1, limit = 5 } = req.query;      // "3" "10"
          const skip = (page - 1) * parseInt(limit);
          queries.skip = skip;
          queries.limit = parseInt(limit);
    
        }

        const jobs = await getJobsService(filters, queries);

        res.status(200).json({
            status: "success",
            data: jobs
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the Jobs",
        });
    }
};

exports.getManagerCreatedJobs = async (req, res, next) => {
    try {
        const email = req.user?.email;
        const jobs = await getManagerCreatedJobsService(email);

        res.status(200).json({
            status: "success",
            data: jobs
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the Jobs",
        });
    }
};

exports.getManagerCreatedJobsById = async (req, res, next) => {
    try {
        
        const {id} = req.params;
        const job = await getManagerCreatedJobsByIdService(id);
        res.status(200).json({
            status: "success",
            data: job
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the Jobs",
        });
    }
};

exports.getJobById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await getJobByIdService(id);

        if (!job) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a job with this id"
            })
        }

        res.status(200).json({
            status: "success",
            data: job,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the Job",
        });
    }
};

exports.updateJob = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateJobService(id, req.body);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the job with this id",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the job"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't update the job",
        });
    }
};

exports.applyForJob = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userEmail = req.user.email;
        const result = await applyJobService(id, userEmail);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the job with this id",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the job"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't update the job",
        });
    }
};