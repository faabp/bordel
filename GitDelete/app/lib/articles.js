
export async function getArticleIdList() {
    return [{
      params: {
        id: '1'
      }
    }, {
      params: {
        id: '2'
      }
    }, {
      params: {
        id: '3'
      }
    }]
  }

  export async function getArticleDetails(articleId) {
    const db = {
      '1': {
        title: 'Juste un moment',
        description: 'Jlai laissé juste un moment, juste pour rentrer gagnant, revenir blindé Défoncé, jprends le volant, jdis bye à la crasse, ma vie change main-de Répond au phone, ne ferme pas la porte, oh babe Personne veut mailler, jfais mon biz ailleurs, eh',
        date: 'Febuary 22, 2019'
      },
      '2': {
        title: 'Ma Réalité',
        description: 'Un tas de bénéfices donc jsuis soupçonné Belek à cette bitch, elle va te consommer Jdémarre si le chèque en vaut le risque, oh no, oh-oh No, oh-oh, oh-oh Jai pris cette life, sale, sale, sale Jte veux seulement quand je tise la night',
        date: 'Febuary 17, 2023'
      },
      '3': {
        title: 'Calme toi',
        description: 'Tu fais des trous dans les comptes, jfais des trous dans ton corps (Pah)',
        date: 'August 12, 2022'
      }
    }
    return db[articleId]
  }