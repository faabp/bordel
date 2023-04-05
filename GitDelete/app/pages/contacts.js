import Layout from "../components/layout"

function Contacts() {
    return  (
    <Layout>   
    <title>HF contacts</title><meta name="description" content="C'est Mozart capitain jackson" /><h1>
            Nos shooters veulent plus de bodies
        </h1><form>
                <div>
                    <label>
                        <span>Prénom</span>
                        <input type="text" name="firstname" />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Nom</span>
                        <input type="text" name="lastname" />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Email</span>
                        <input type="text" name="email" />
                    </label>
                    <div>
                    </div>
                    <label>
                        <span>Message</span>
                        <textarea name="message" />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Envoyer" />
                </div>
            </form>
    </Layout>  
    )
}

    export default Contacts
