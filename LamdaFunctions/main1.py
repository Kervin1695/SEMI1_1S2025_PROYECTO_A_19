from __future__ import print_function  # Para compatibilidad con Python 2/3

import boto3
import json
import urllib
from decimal import Decimal

print('Loading function')

# Inicialización de los clientes de AWS
dynamodb = boto3.client('dynamodb')
s3 = boto3.client('s3')
rekognition = boto3.client('rekognition')

# 🔹 Función para indexar rostros con Rekognition
def index_faces(bucket, key):
    response = rekognition.index_faces(
        Image={
            "S3Object": {
                "Bucket": bucket,
                "Name": key
            }
        },
        CollectionId="loginProfile"  # ID de la colección de rostros
    )
    return response

# 🔹 Función para guardar datos en DynamoDB
def update_index(tableName, faceId, fullName):
    response = dynamodb.put_item(
        TableName=tableName,
        Item={
            'RekognitionId': {'S': faceId},
            'FullName': {'S': fullName}
        }
    )
    return response

# 🔹 Función principal que se ejecuta cuando se sube una imagen
def lambda_handler(event, context):
    # Obtiene el nombre del bucket y la clave del archivo
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    print("Bucket:", bucket)
    print("Key:", key)

    try:
        # Llama a Rekognition para indexar rostros
        response = index_faces(bucket, key)

        # Extrae faceId del primer rostro detectado
        faceId = response['FaceRecords'][0]['Face']['FaceId']

        # Obtiene los metadatos del archivo en S3 (como el nombre de la persona)
        metadata = s3.head_object(Bucket=bucket, Key=key)
        personFullName = metadata['Metadata']['fullname']

        # Guarda en DynamoDB
        update_index('loginProfileTable', faceId, personFullName)

        # Imprime y retorna la respuesta
        print("Rekognition Response:", response)
        return response

    except Exception as e:
        print("Error processing image: ", e)
        raise e
