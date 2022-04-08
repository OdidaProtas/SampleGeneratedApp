
        
      const relations = [{left:"User", right:"Profile", type:"OneToOne"}]
      const entities = [{EntityName:"User", nameKey: "name" ,columns:[{key:"name", nullable:false, type:"string"}]},{EntityName:"Profile", nameKey: "avatar" ,columns:[{key:"avatar", nullable:false, type:"string"}]}]
      
      export function getEntities() {
          return entities
      }
      
      export function getEntity(name) {
          return entities.reduce((p, c) => ({...p, [c.EntityName]: c }), {})[name]
      }
      
      export function getRelations(name) {
          return (relations || []).filter(f => (name === f.left) || (name === f.right)) || []
      }
      
      export function filterUnique(v, i, s) {
          return s.indexOf(v) === i
      }
      
      export function getRelation(rel, name) {
          if (rel.left === name) {
              return rel.right
          } else {
              return rel.left
          }
      }