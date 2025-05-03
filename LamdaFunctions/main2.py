import json
import base64
import boto3
import os

# Configura el cliente S3
s3 = boto3.client('s3')

def lambda_handler(event, context):
    # Nombre del bucket
    bucket_name = 'facelogin-images'

    try:
        # Verificar si el cuerpo del evento es una cadena JSON
        if isinstance(event.get('body'), str):
            event = json.loads(event['body'])

        # Extraer nombre y contenido de la imagen
        image_name = event.get('name')  # Ej: 'elon.jpg'
        image_base64 = event.get('image')  # Imagen en base64
        image_fullname = event.get('fullname')  # FullName

        if not image_name or not image_base64:
            raise ValueError("Faltan parámetros necesarios: 'name' o 'image'")

        # Si el fullname no está presente, usamos el nombre de la imagen
        if not image_fullname:
            image_fullname = os.path.splitext(image_name)[0]

        # Decodificar imagen
        image_data = base64.b64decode(image_base64)

        # Crear ruta lógica en S3 (carpeta index/)
        object_key = f"index/{os.path.basename(image_name)}"

        # Subir imagen a S3 con la metadata correcta
        s3.put_object(
            Bucket=bucket_name,
            Key=object_key,
            Body=image_data,
            ContentType='image/jpeg',
            Metadata={'fullname': image_fullname}
        )

        # Construir URL de la imagen subida
        image_url = f"https://{bucket_name}.s3.amazonaws.com/{object_key}"

        # Devolver respuesta exitosa con encabezados CORS
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",  # Cambia "*" por tu dominio si es necesario
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            "body": json.dumps({
                "message": "Imagen subida exitosamente",
                "imageUrl": image_url
            })
        }

    except Exception as e:
        # Devolver respuesta de error con encabezados CORS
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            "body": json.dumps({
                "message": "Ocurrió un error al subir la imagen",
                "error": str(e)
            })
        }
