export class EnvService {

    connectionDetails = {
        HOST: 'localhost',
        PORT: '3001'
    }

    getConnectionDetails() {
        return this.connectionDetails;
    }
}