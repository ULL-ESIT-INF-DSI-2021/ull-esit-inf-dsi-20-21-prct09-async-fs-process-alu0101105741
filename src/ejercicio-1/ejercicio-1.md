# Ejercicio 1

## Traza del ejemplo
### Inicializamos 
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
  |  |  | 

### 1º Paso 
Se introduce el main en la pila
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
main  |  |  | 

### 2º Paso 
Introducimos el access de la API en la pila
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 access |  |  | 
main | | |
### 3º Paso 
El access pasa al registro
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 main | access |  | 

### 4º Paso 
Salen el main y el access de la pila y el registro respectivamente mientras que el callback de access se situa en la cola de manejadores
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
  |  | callback | 

### 5º Paso 
El callback pasa de la cola a la pila
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 callback |  |  | 

### 6º Paso 
Comienza la ejecución del callback
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 console.log() |  |  | 
 callback | | |

### 7º Paso 
Se muestra por pantalla que se está comenzando a vigilar el fichero
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 callback |  |  | console.log()

### 8º Paso 
Se introduce la función watch() en la pila
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 watch() |  |  | 
 callback | | |

### 9º Paso 
Se ejecuta la función anterior y sale de la pila
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 callback |  |  | 

### 10º Paso 
Se introduce ahora la función watcher.on() en la pila
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 watcher.on() |  |  | 
 callback | | |

### 11º Paso 
Se pasa la función watcher.on() al registro
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 callback | watcher.on() |  | 

### 12º Paso 
Se queda esperando el cambio mientras se introduce el console.log() en la pila
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 console.log | watcher.on() |  | 
 callback | | |

### 13º Paso 
Se ejecuta el console.log() por lo que se muestra por pantalla
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 |watcher.on()| |console.log()

### 14º Paso 
Aparece el callback de watcher.on() en la cola 
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | ---- | ---- | ----
 |watcher.on()|callback de watcher| 

### 15º Paso 
El callback pasa a la pila 
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
callback de watcher|watcher.on()||

### 16º Paso 
Se ejecuta el callback y se añade el console.log() a la pila
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 console.log()| | | 
 callback de watcher.on()|watcher.on()| | 

### 17º Paso 
Se ejecuta el console.log() por lo que se muestra por la salida y el callback sale de la pila
Pila de llamada | Registro de eventos | Cola de manejadores | Salida
---- | - | - | -
 |watcher.on()| |console.log() 

Por último se repetirán los últimos 4 pasos hasta que el programa finalice.

## ¿Qué hace la función access?
La función access nos permite probar los permisos de un fichero o directorio. Esto se debe hacer pasándole el path de dicho fichero o directorio y los permisos a comprobar usando las constantes de acceso a archivos.

## ¿Para qué sirve el objeto constants?
El objeto constants nos es muy útil a la hora de realizar operaciones sobre el sistema de archivos ya que cuenta con las constantes más utilizadas en estos casos.
