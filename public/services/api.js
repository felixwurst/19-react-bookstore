export const registerPost = (email, password, repassword) => {
    const sendData = {
        email,
        password,
        repassword
    }
    return new Promise((resolve, reject) => {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('Can not send data to server. Response number: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const loginPost = (email, password) => {
    const sendData = {
        email,
        password
    }
    return new Promise((resolve, reject) => {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('Can not send data to server. Response number: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const getBooksPost = () => {
    return new Promise((resolve, reject) => {
        fetch('/getbooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('Can not send data to server. Response number: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const getBookPost = bookID => {
    return new Promise((resolve, reject) => {
        const sendData = {
            id: bookID
        }
        fetch('/getbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('Can not send data to server. Response number: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const addBookPost = (bookTitle, bookImages, bookPdf, bookDescription) => {
    return new Promise((resolve, reject) => {
        // formdata
        const fd = new FormData()
        fd.append('bookTitle', bookTitle)
        for (let i = 0; i < bookImages.length; i++) {
            fd.append('bookImage' + i, bookImages[i])
        }
        fd.append('bookPdf', bookPdf)
        fd.append('bookDescription', bookDescription)
        // fetch
        fetch('/admin/addbook', {
            method: 'POST',
            body: fd
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('Can not send data to server. Response number: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const getMyBooksPost = () => {
    return new Promise((resolve, reject) => {
        fetch('/admin/mybooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('Can not send data to server. Response number: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const deleteBookPost = bookID => {
    return new Promise((resolve, reject) => {
        fetch('/admin/deletebook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookID })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('Can not send data to server. Response number: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const editBookPost = (bookID, bookTitle, oldBookImages, newBookImages, newBookPdf, bookDescription) => {
    return new Promise((resolve, reject) => {
        // formdata
        const fd = new FormData()
        fd.append('bookID', bookID)
        fd.append('bookTitle', bookTitle)
        fd.append('oldBookImagesUrls', JSON.stringify(oldBookImages))
        for (let i = 0; i < newBookImages.length; i++) {
            fd.append('bookImage' + i, newBookImages[i])
        }
        if (newBookPdf) {
            fd.append('bookPdf', newBookPdf)
        }
        fd.append('bookDescription', bookDescription)
        // fetch
        fetch('/admin/updatedbook', {
            method: 'POST',
            body: fd
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('Can not send data to server. Response number: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const logoutPost = () => {
    return new Promise((resolve, reject) => {
        fetch('/admin/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('Can not send data to server. Response number: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const checkLoginPost = () => {
    return new Promise((resolve, reject) => {
        fetch('/checklogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('Can not send data to server. Response number: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}