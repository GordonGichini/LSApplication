const Project = require('../../models/project');

exports.createProject = async (req, res) => {
    try {
        const { name, description, customerId } = req.body;
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({ include: { model: Customer, as: 'customer' } });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const { name, description, customerId } = req.body;
        const project = await Project.findByPk(req.params.id);
        if (project) {
            project.name = name;
            project.description = description;
            project.customerId = customerId;
            await project.save();
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const [updated] = await Project.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedProject = await Project.findByPk(req.params.id);
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const deleted = await Project.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};