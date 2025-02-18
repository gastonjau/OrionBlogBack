import express from 'express'
import mongoose from 'mongoose';
import { ModelBlog } from './mongo/ModelBlog';

export class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  public start() {

    const MONGO_URI = "mongodb://admin:root@localhost:27017/"; 

    mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch(err => console.error("❌ Error de conexión:", err));

    this.app.use(express.json());


    this.app.get("/", async (req, res) => {
        try {
          const encontrados = await ModelBlog.find({})
          res.json({ encontrados });
        } catch (error) {
          console.error("Error en la consulta:", error);
          res.status(500).json({ error: "Error al obtener los blogs" });
        }
      });

    this.app.post('/', async (req, res) => {
        
            const {title, description, image, content ,destacado} = req.body;

            const creado = await ModelBlog.create({title, description, image, content, destacado})
                
            res.json(creado)
        })
    
    this.app.delete('/:id', async (req, res) => {
        const id = req.params.id;
        try {
          const eliminado = await ModelBlog.findByIdAndDelete(id);
          res.json(eliminado);
        } catch (error) {
          console.error("Error al eliminar:", error);
          res.status(500).json({ error: "Error al eliminar el blog" });
        }
    })

 
    this.app.put('/:id', async (req, res):Promise<any> => {
      try {
      const id  = req.params.id;
      const { title, description, image, content, destacado } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'ID inválido' });
      }
    
        const buscado = await ModelBlog.findById(id);
        if (!buscado) {
          return res.status(404).json({ error: 'Artículo no encontrado' });
        }
    
        
        if (!title && !description && !image && !content && destacado === undefined) {
          return res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
        }

        Object.assign(buscado, { title, description, image, content, destacado });
    

        const actualizado = await buscado.save();
    
        res.status(200).json(actualizado);
      } catch (error) {
        console.error('Error al actualizar el artículo:', error);
       res.status(500).json({ error: 'Error interno del servidor' });
      }
    });
    

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });




  }
}


