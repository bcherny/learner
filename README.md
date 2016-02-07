# learner

> learn an alphabet given a training set

### running

```sh
npm i
npm start
```

### sample output (from test case 2)

```text
~/Sites/github/learner (master)*$ node learner.js
learned: a > b (addChilding b to a to root)
  world: root
└── a
    └── b
        └── (empty)
        
    

learned: a > e (addChilding to e to a)
  world: root
└── a
    ├── b
    │   └── (empty)
    │   
    └── e
        └── (empty)
        
    

learned: e > r (addChilding to r to e)
  world: root
└── a
    ├── b
    │   └── (empty)
    │   
    └── e
        └── r
            └── (empty)
            
        
    

learned: b > c (addChilding to c to b)
  world: root
└── a
    ├── b
    │   └── c
    │       └── (empty)
    │       
    │   
    └── e
        └── r
            └── (empty)
            
        
    

learned: c > d (addChilding to d to c)
  world: root
└── a
    ├── b
    │   └── c
    │       └── d
    │           └── (empty)
    │           
    │       
    │   
    └── e
        └── r
            └── (empty)
            
        
    

learned: a > o (addChilding to o to a)
  world: root
└── a
    ├── b
    │   └── c
    │       └── d
    │           └── (empty)
    │           
    │       
    │   
    ├── e
    │   └── r
    │       └── (empty)
    │       
    │   
    └── o
        └── (empty)
        
    

learned: d > e (addChilding to e to d)
  world: root
└── a
    ├── b
    │   └── c
    │       └── d
    │           └── e
    │               └── r
    │                   └── (empty)
    │                   
    │               
    │           
    │       
    │   
    └── o
        └── (empty)
        
    

learned: e > r (addChilding to r to e)
  world: root
└── a
    ├── b
    │   └── c
    │       └── d
    │           └── e
    │               └── r
    │                   └── (empty)
    │                   
    │               
    │           
    │       
    │   
    └── o
        └── (empty)
        
    

learned: r > o (addChilding to o to r)
  world: root
└── a
    └── b
        └── c
            └── d
                └── e
                    └── r
                        └── o
                            └── (empty)
                            
                        
                    
                
            
        
    

   done: root
└── a
    └── b
        └── c
            └── d
                └── e
                    └── r
                        └── o
                            └── (empty)
                            
                        
                    
                
            
        
 
```