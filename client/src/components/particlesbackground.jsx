import Particles from 'react-tsparticles'
import Multiparticle from './config/multiparticle'


const ParticlesBackground = () => {
  return (
    <div className='particle'>

        <Particles options={Multiparticle} />
        <h1>Hello test</h1>
     
      
    </div>
  )
}

export default ParticlesBackground
