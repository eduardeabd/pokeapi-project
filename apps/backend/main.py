from fastapi import FastAPI
import httpx

app = FastAPI()

@app.get("/")
def inicio():
    return {"mensaje": "Backend de PokeAPI funcionando"}

@app.get("/pokemon/{nombre}")
async def obtener_pokemon(nombre: str):
    async with httpx.AsyncClient() as cliente:
        respuesta = await cliente.get(f"https://pokeapi.co/api/v2/pokemon/{nombre.lower()}")

    if respuesta.status_code != 200:
        return {"error": "No se encontró ese Pokémon"}

    datos = respuesta.json()

    return {
        "nombre": datos["name"],
        "altura": datos["height"] / 10,
        "peso": datos["weight"] / 10,
        "tipos": [t["type"]["name"] for t in datos["types"]],
        "habilidades": [a["ability"]["name"] for a in datos["abilities"]],
        "sprite": datos["sprites"]["front_default"],
    }