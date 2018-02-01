export class EnvService {

    connectionDetails = {
        HOST: '',
        PORT: ''
    }

    getConnectionDetails() {
        return this.connectionDetails;
    }
}